import { FC, useState } from "react";
// import { XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

interface ToggleButtonProps {
  children: React.ReactNode;
  className?: string;
  isChecked?: boolean
}

// export const ExpandButton: FC<ButtonProps> = ({ children, ...props }) => {
//   return (
//     <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
//       {children}
//     </button>
//   );
// };

// export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
//   return (
//     <button className="hover:text-gray-700 transition-colors flex items-center justify-center" {...props}>
//       <XMarkIcon />
//     </button>
//   );
// };

//--------------------------------------i used one universal button----------------------------------


/**
 * A generic button component.
 *
 * The component will apply the given class name to the button element. If no class name is provided, it will default to
 * "hover:text-gray-700 transition-colors flex items-center justify-center".
 *
 * Additionally, any other props will be spread onto the button element.
 */

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={props.className? props.className :"hover:text-gray-700 transition-colors flex items-center justify-center"}  {...props}>
      {children}
    </button>
  );
}


/**
 * A toggle button component.
 *
 * The component renders a toggle button with a hidden checkbox and a styled label.
 *
 * The component accepts a single child, which should be a string or a JSX element
 * that will be rendered as the label for the toggle button.
 *
 * The component also accepts a className prop, which should be a string that will be
 * applied to the outermost element of the component.
 *
 * The component uses the `useState` hook to manage the state of the toggle button.
 *
 * The component renders a hidden input element of type "checkbox". The component also
 * renders a styled label element that contains the child element and a styled div
 * element that serves as the indicator for the toggle button.
 *
 * The component uses the `peer` and `dark:peer` classes to style the toggle button and
 * its indicator based on whether the checkbox is checked or not.
 *
 * The component uses the `rtl` class to style the toggle button and its indicator based
 * on the direction of the text.
 *
 * @param {{ children: React.ReactNode, className?: string }} props
 */
export function ToggleButton({ children, className } : ToggleButtonProps){
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <label className={className? className :`inline-flex items-center cursor-pointer ml-2 ${className}`}>
        <input
          className="sr-only peer"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
      <p className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{children}</p>
    </div>
  );
}