import { Controller, useFormContext } from "react-hook-form";
import { Form } from "antd";
import { TimePicker as AntdTimePicker } from "antd";

type TDatePicker = {
  name: string;
  label: string;
};

const TimePicker = ({ name, label }: TDatePicker) => {
  const { control } = useFormContext();

  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Form.Item label={label}>
              <AntdTimePicker
                {...field}
                size="large"
                style={{ width: "100%" }}
                format="HH:mm"
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </Form.Item>
          </>
        )}
      ></Controller>
    </div>
  );
};

export default TimePicker;
