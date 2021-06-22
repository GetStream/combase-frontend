import styled from 'styled-components';
import { Box, Button, PageTitle, StreamLogo, Text, TextInput } from '@combase.app/ui';
import { itemGap } from '@combase.app/styles';
import { Link } from 'react-router-dom';

const Fields = styled(Box)`
    & > * + * {
        ${itemGap};
    }
`;

const Actions = styled(Box)`
    display: flex;
    flex-direction: column;
    & > * + * {
        ${itemGap};
    }
`;

const loginForm = formik => {
    return (
        <form onSubmit={formik.handleSubmit}>
            <StreamLogo size={7} />
            <PageTitle subtitle="Welcome to" title="Combase" />
            <Fields gapTop={2} marginTop={4}>
                <TextInput
                    label="Email"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    touched={formik.touched?.email}
                    error={formik.errors?.email}
                    value={formik.values.email}
                />
                <TextInput
                    error={formik.touched?.password && formik.errors?.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    touched={formik.touched.password}
                    type="password"
                    value={formik.values.password}
                />
            </Fields>
            <Actions marginTop={7} gapTop={3}>
                <Button type="submit">
                    <Text color="white">{'Login'}</Text>
                </Button>
                <Button variant="flat" size="sm" color="altText" as={Link} to="/create-account" type="button">
                    <Text color="altText">{'Create Account'}</Text>
                </Button>
            </Actions>
        </form>
    );
};

export default loginForm;
