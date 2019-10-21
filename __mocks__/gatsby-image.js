const React = require("react")

module.exports = jest.fn().mockImplementation(
  ({fluid, ...rest}) => React.createElement("img", { src: fluid, ...rest }),
)
