import { Input } from './ui';

const formRow = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type,
  ...props
}) => {
  return (
    <div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor={name} className='text-sm'>
          {label}
        </label>
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className='p-5'
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default formRow;
