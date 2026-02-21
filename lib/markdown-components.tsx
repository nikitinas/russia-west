import type { Components } from "react-markdown";

/**
 * Table wrapped in a horizontal-scroll container so wide tables don't break page layout.
 */
export const markdownComponents: Components = {
  table: ({ children, ...props }) => (
    <div className="table-scroll-wrapper">
      <table {...props}>{children}</table>
    </div>
  ),
};
