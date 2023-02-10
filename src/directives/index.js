//https://codesandbox.io/s/8e9k3
import tooltipDirective from "./Tooltip/";

// register all directives
const directives = (app) => {
  tooltipDirective(app);
};

export default directives;