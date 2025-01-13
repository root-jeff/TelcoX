//snackbarservices

import { SnackbarProps } from "./SnackBarInterface";

type SnackCallBack = (opt: SnackbarProps) => void;

interface QueueItem extends SnackbarProps {
  timestamp: number;
}

class MultiSnackbarService {
  private static instance: MultiSnackbarService;
  private listeners: Set<SnackCallBack> = new Set();
  private queue: QueueItem[] = [];
  private activeSnacks: QueueItem[] = [];
  private maxActive: number = 3;
  private defaultDuration: number = 3000; //ms

  private constructor() {
    //para el singlreton xd
  }

  public static getInstance(): MultiSnackbarService {
    if (!MultiSnackbarService.instance) {
      MultiSnackbarService.instance = new MultiSnackbarService();
    }
    return MultiSnackbarService.instance;
  }

  public subscribe(listener: SnackCallBack): () => void {
    this.listeners.add(listener);
    return () => this.unsubscribe(listener);
  }

  public unsubscribe(listener: SnackCallBack): void {
    this.listeners.delete(listener);
  }

  private notify(snack: QueueItem): void {
    this.listeners.forEach((subscriber) =>
      subscriber({
        ...snack,
      })
    );
  }
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  public open(opt: Omit<SnackbarProps, "open">): void {
    if (this.activeSnacks.length >= this.maxActive) return;

    const snack: QueueItem = {
      ...opt,
      id: opt.id || this.generateId(),
      timestamp: Date.now(),
      open: true,
      autoHideDuration: opt.autoHideDuration || this.defaultDuration,
      isAutoHide: opt.isAutoHide !== undefined ? opt.isAutoHide : true,
    };
    //para agregarlo a la cola
    if (this.activeSnacks.length >= this.maxActive) {
      this.queue.push(snack);
      return;
    }

    this.activeSnacks.push(snack);
    this.notify(snack);

    if (snack.isAutoHide && snack.autoHideDuration) {
      setTimeout(() => this.close(snack.id), snack.autoHideDuration);
    }
  }

  public close(id: string): void {
    const snackIndex = this.activeSnacks.findIndex((s) => s.id === id);
    if (snackIndex !== -1) {
      const snack = this.activeSnacks[snackIndex];
      // Notificar con open: false para cerrar
      this.notify({ ...snack, open: false });

      // Eliminar el snack del array de activos
      this.activeSnacks.splice(snackIndex, 1);

      // Si hay snacks en cola, procesar el siguiente
      this.processQueue();
    }
  }

  private processQueue(): void {
    // Mientras haya espacio y haya snacks en cola, abrir snacks
    while (this.activeSnacks.length < this.maxActive && this.queue.length > 0) {
      const nextSnack = this.queue.shift();
      if (nextSnack) {
        this.open(nextSnack);
      }
    }
  }

  public getQueueLength(): number {
    return this.queue.length;
  }

  public clearQueue(): void {
    this.queue = [];
  }

  public update(id: string, updateProps: Partial<SnackbarProps>): void {
    const snackIndex = this.activeSnacks.findIndex((s) => s.id === id);
    if (snackIndex !== -1) {
      const updatedSnack = {
        ...this.activeSnacks[snackIndex],
        ...updateProps,
      };

      this.activeSnacks[snackIndex] = updatedSnack;
      this.notify(updatedSnack);
    }
  }
}

export const Snack = MultiSnackbarService.getInstance();
