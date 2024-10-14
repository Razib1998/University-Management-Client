import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TFormSelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const FormSelect = ({ label, name, options }: TFormSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Select
            size="large"
            {...field}
            style={{ width: "100%" }}
            options={options}
          />
        </Form.Item>
      )}
    />
  );
};

export default FormSelect;
