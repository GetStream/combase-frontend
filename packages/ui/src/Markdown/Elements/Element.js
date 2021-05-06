import styled from 'styled-components';

const ElementBase = ({ attributes, children, className, htmlAttributes, as: Component = 'div', style }, ref) => (
    <Component ref={ref} className={className} style={style} {...attributes} {...htmlAttributes}>
        {children}
    </Component>
);

const Element = styled(ElementBase, {}, undefined, {
    scope: 'Element',
})``;

export default Element;
