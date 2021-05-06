import { useToggle } from 'react-use';
import {
	CloseIcon,
	SearchIcon,
	KnowledgeBaseIcon,
	Box,
	EmptyView,
	ScrollbarsWithContext 
} from '@combase.app/ui';

import { WidgetHeader } from '../../WidgetHeader';

const articles = [];
const KnowledgeBase = () => {
    const [searchMode, toggleSearchMode] = useToggle();

    return (
        <ScrollbarsWithContext type="px">
            <WidgetHeader
                onBackClick={history.goBack}
                action={
                    <IconButton
                        color={!searchMode ? 'altText' : 'error'}
                        icon={!searchMode ? SearchIcon : CloseIcon}
                        onClick={toggleSearchMode}
                        size={4}
                    />
                }
                title="Knowledge Base"
                subtitle={`${articles?.length || 0} total`}
            />
            <Box paddingX={2} paddingTop={2} paddingBottom={4}>
                {articles?.length ? (
                    articles.map(article => <p>Article</p>)
                ) : (
                    <EmptyView
                        color="altTextA.56"
                        icon={<KnowledgeBaseIcon color="altTextA.56" size={10} />}
                        minHeight={12}
                        title="Nothing here"
                    />
                )}
            </Box>
        </ScrollbarsWithContext>
    );
};

export default KnowledgeBase;
