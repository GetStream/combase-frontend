import React, { forwardRef } from 'react';

import Icon from '../Icon';

export const BadgeIcon = forwardRef((props, ref) => (
    <Icon {...props} ref={ref} viewBox="0 0 32 32">
        <path d="M24 16C24 20.4183 20.4183 24 16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16Z" />
    </Icon>
));
