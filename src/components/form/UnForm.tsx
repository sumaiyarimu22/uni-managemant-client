import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFromConfig = {
  defaultValues?: Record<string, any>;
};

type TFromProps = {
  submitHandler: SubmitHandler<any>;
  children: ReactNode;
} & TFromConfig;

const UnForm = ({ submitHandler, children, defaultValues }: TFromProps) => {
  const fromConfig: TFromConfig = {};

  if (defaultValues) {
    fromConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm(fromConfig);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>{children}</form>;
    </FormProvider>
  );
};

export default UnForm;
