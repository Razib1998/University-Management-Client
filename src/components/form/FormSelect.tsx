import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TFormSelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
};

const FormSelect = ({
  label,
  name,
  options,
  disabled,
  mode,
}: TFormSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            size="large"
            {...field}
            style={{ width: "100%" }}
            options={options}
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default FormSelect;
