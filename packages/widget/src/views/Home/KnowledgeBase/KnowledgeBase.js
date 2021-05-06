import { Link } from 'react-router-dom';
import {
	Box,
	Button,
	Card,
	CardHeader,
	EmptyView,
	Spinner,
	DraftIcon,
	ChevronRightIcon,
	KnowledgeBaseIcon,
	Text
} from '@combase.app/ui'; 

const KnowledgeBase = () => {
    const loading = false;
    return (
        <Card boxShadow={2}>
            <CardHeader
                action={loading ? <Spinner size={4} /> : undefined}
                icon={<KnowledgeBaseIcon color="purple" size={4} />}
                minHeight={8}
                paddingX={[4, 4, 5]}
                paddingTop={4}
            >
                Knowledge Base
            </CardHeader>
            <Box paddingX={[1, 1, 2]}>
                <EmptyView color="altTextA.56" icon={<DraftIcon color="altTextA.56" size={10} />} minHeight={12} title="No Articles" />
            </Box>
            <Box padding={2}>
                <Button color="purple" as={Link} variant="flat" size="sm" reverseLabel fullWidth to="/knowledge-base">
                    <ChevronRightIcon />
                    <Text>View all</Text>
                </Button>
            </Box>
        </Card>
    );
};

export default KnowledgeBase;
