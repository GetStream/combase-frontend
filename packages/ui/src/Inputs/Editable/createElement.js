const createElement = (Component, props = {}) => ({ attributes, nodeProps, children, className }) => {
	return <Component {...attributes} children={children} className={className} {...nodeProps} {...props} />
}
export default createElement;