import { LoaderType } from "./LoaderInterface";

class LoaderServices {
  private static instance: LoaderServices | null = null;
  private listeners: Set<(type: LoaderType) => void> = new Set();
  private active: boolean = false;
  private currentType: LoaderType = "default";

  private constructor() {}

  public static getInstance(): LoaderServices {
    if (LoaderServices.instance === null) {
      LoaderServices.instance = new LoaderServices();
    }
    return LoaderServices.instance;
  }

  public subscribe(listener: (type: LoaderType) => void): void {
    this.listeners.add(listener);
  }

  public unsubscribe(listener: (type: LoaderType) => void): void {
    this.listeners.delete(listener);
  }

  public show(type?: LoaderType): void {
    this.currentType = type || "default";
    this.active = true;
    this.notifyListeners();
  }

  public hide(): void {
    this.active = false;
    this.currentType = "default";
    this.notifyListeners();
  }

  public isActive(): boolean {
    return this.active;
  }
  public getCurrentType(): LoaderType {
    return this.currentType;
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      try {
        listener(this.currentType);
      } catch (error) {}
    });
  }
}

export const Loader = LoaderServices.getInstance();
