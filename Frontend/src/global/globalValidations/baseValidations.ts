import * as Yup from "yup";

const createCustomMessage = (defaultMessage: string) => (message?: string) =>
  message || defaultMessage;

// Base de validaciones reutilizables
const baseYupValidation = (
  baseValidation: Yup.StringSchema,
  {
    regexPattern,
    customMessage,
    required = false,
    maxLength,
  }: {
    regexPattern?: string;
    customMessage?: string;
    required?: boolean;
    maxLength?: number;

  }
) => {
  if (regexPattern) {
    baseValidation = baseValidation.matches(
      new RegExp(regexPattern),
      customMessage
    );
  }
  if (required) {
    baseValidation = baseValidation.required(
      customMessage || "Este campo es obligatorio"
    );
  }
  if (maxLength) {
    baseValidation = baseValidation.max(
      maxLength,
      customMessage || `No puede exceder ${maxLength} caracteres`
    );
  }
  return baseValidation;
};

// Validaciones específicas
export const baseValidations = {
  soloNumeros: (message?: string, maxLength?: number, required = false) => {
    const defaultMessage = "Solo se permiten números";
    const customMessage = createCustomMessage(defaultMessage)(message);
    const regexPattern = maxLength ? `^[0-9]{1,${maxLength}}$` : `^[0-9]+$`;

    return baseYupValidation(Yup.string(), {
      regexPattern,
      customMessage,
      required,
    });
  },

  formatoFecha: (campo: string, requerido = false) => {

    const formatDate = (date: Date): string => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };
    let schema = Yup.string()
      .test("is-valid-date", `La ${campo} no es válida.`, (value) => {
        if (!value) return !requerido; 
        const date = new Date(value.split("/").reverse().join("-"));
        return !isNaN(date.getTime());
      })
      .transform((value) => {
        if (!value) return value;
        const date = new Date(value.split("/").reverse().join("-"));
        return isNaN(date.getTime()) ? value : formatDate(date);
      });

    if (requerido) {
      schema = schema.required(`La ${campo} es obligatoria.`);
    }

    return schema;
  },

  soloDosDecimales: (
    message?: string,
    maxLength?: number,
    required = false
  ) => {
    const defaultMessage = "Solo se permiten números con hasta 2 decimales";
    const customMessage = createCustomMessage(defaultMessage)(message);

    // Patrón regex que admite números enteros y decimales con hasta 2 dígitos
    const regexPattern = maxLength
      ? `^\\d{1,${maxLength}}(\\.\\d{1,2})?$`
      : `^\\d+(\\.\\d{1,2})?$`;

    return baseYupValidation(Yup.string(), {
      regexPattern,
      customMessage,
      required,
    });
  },

  sinCaracteresEspeciales: (message?: string, required = false) => {
    const defaultMessage = "No se permiten caracteres especiales";
    const customMessage = createCustomMessage(defaultMessage)(message);

    return baseYupValidation(Yup.string(), {
      regexPattern: "^[a-zA-Z0-9\\s]+$",
      customMessage,
      required,
    });
  },

  soloLetrasES: (message?: string, required = false, maxLength?: number) => {
    const defaultMessage = "Solo se permiten letras";
    const customMessage = createCustomMessage(defaultMessage)(message);

    return baseYupValidation(Yup.string(), {
      regexPattern: "^[a-zA-Z-ñÑ\\s]+$",
      customMessage,
      required,
      maxLength,
    });
  },

  longitudMinima: (min: number, message?: string) => {
    const defaultMessage = `Debe tener al menos ${min} caracteres`;
    const customMessage = createCustomMessage(defaultMessage)(message);

    return Yup.string().min(min, customMessage);
  },

  longitudMaxima: (max: number, message?: string) => {
    const defaultMessage = `No puede exceder ${max} caracteres`;
    const customMessage = createCustomMessage(defaultMessage)(message);

    return Yup.string().max(max, customMessage);
  },

  correoElectronico: (message?: string, required = false) => {
    const defaultMessage = "Formato de correo electrónico inválido";
    const customMessage = createCustomMessage(defaultMessage)(message);

    return baseYupValidation(Yup.string().email(customMessage), {
      required,
      customMessage,
    });
  },

  documentoIdentidad: Yup.string()
    .when("idTipoDocumento", {
      is: "2", // Cédula
      then: (schema) =>
        schema
          .matches(
            /^[0-9]{10}$/, // Solo números, exactamente 10 dígitos
            "La cédula debe tener 10 dígitos"
          )
          .required("Este campo es obligatorio"),
      otherwise: (schema) =>
        schema.when("idTipoDocumento", {
          is: "1", // RUC
          then: (schema) =>
            schema
              .matches(
                /^[0-9]{13}$/, // Solo números, exactamente 13 dígitos
                "El RUC debe tener 13 dígitos"
              )
              .required("Este campo es obligatorio"),
          otherwise: (schema) =>
            schema
              .matches(
                /^[a-zA-Z0-9_]{1,50}$/, // Alfanuméricos y guión bajo, hasta 50 caracteres
                "El número de documento puede tener hasta 50 caracteres alfanuméricos"
              )
              .max(
                50,
                "El número de documento no puede superar los 50 caracteres"
              )
              .required("Este campo es obligatorio"),
        }),
    })
    .required("Este campo es obligatorio"),

  campoRequerido: (message?: string) => {
    const defaultMessage = "Este campo es obligatorio";
    const customMessage = createCustomMessage(defaultMessage)(message);

    return Yup.string().required(customMessage);
  },

  selectorRequerido: (message?: string) => {
    const defaultMessage = "Este campo es obligatorio";
    const customMessage = createCustomMessage(defaultMessage)(message);

    return Yup.number()
      .notOneOf([0], customMessage) // Asegura que el valor no sea 0
      .required(customMessage);
  },

};
