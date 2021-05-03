import { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
    gql,
    useQuery,
    useMutation,
    GET_CURRENT_USER,
    GROUP_ADD_TAG,
    GROUP_REMOVE_TAG,
    GET_GROUP,
    UPDATE_GROUP,
    REMOVE_GROUP,
    NEW_GROUP_FRAGMENT,
} from '@combase.app/apollo';

const ADD_TO_GROUP = gql`
    mutation addToGroup($_id: MongoID!, $group: MongoID!) {
        agentAddToGroup(_id: $_id, group: $group) {
            _id
        }
    }
`;

const REMOVE_FROM_GROUP = gql`
    mutation removeFromGroup($_id: MongoID!, $group: MongoID!) {
        agentRemoveFromGroup(_id: $_id, group: $group) {
            _id
        }
    }
`;

const useGroupActions = groupIdProp => {
    const params = useParams();
    const history = useHistory();
    const groupId = params?.groupId || groupIdProp;
    const { data: currentUser } = useQuery(GET_CURRENT_USER);

    const [addToGroup, { loading: addingMember }] = useMutation(ADD_TO_GROUP);
    const [removeFromGroup, { loading: removingMember }] = useMutation(REMOVE_FROM_GROUP);
    const [handleUpdateGroup, { error: updateError, loading: updating }] = useMutation(UPDATE_GROUP);
    const [handleRemoveGroup, { error: removeError, loading: removing }] = useMutation(REMOVE_GROUP);
    const [handleAddTag] = useMutation(GROUP_ADD_TAG);
    const [handleRemoveTag] = useMutation(GROUP_REMOVE_TAG);

    /**
     * Callbacks
     */

    const addMember = useCallback(
        async _id => {
            try {
                await addToGroup({
                    refetchQueries: [{ query: GET_GROUP, variables: { _id: groupId } }],
                    variables: {
                        _id,
                        group: groupId,
                    },
                });
            } catch (error) {
                console.error(error.message);
            }
        },
        [groupId]
    );

    const removeMember = useCallback(
        async _id => {
            try {
                await removeFromGroup({
                    refetchQueries: [{ query: GET_GROUP, variables: { _id: groupId } }],
                    variables: {
                        _id,
                        group: groupId,
                    },
                });
            } catch (error) {
                console.error(error.message);
            }
        },
        [groupId]
    );

    const updateGroup = useCallback(
        async values => {
            try {
                await handleUpdateGroup({
                    refetchQueries: [{ query: GET_GROUP, variables: { _id: groupId } }],
                    update: (
                        cache,
                        {
                            data: {
                                groupUpdate: { group },
                            },
                        }
                    ) => {
                        cache.writeFragment({
                            data: group,
                            fragment: NEW_GROUP_FRAGMENT,
                        });
                    },
                    variables: {
                        _id: groupId,
                        record: values,
                    },
                });
            } catch (error) {
                console.error(error.message);
            }
        },
        [groupId, handleUpdateGroup]
    );

    const removeGroup = useCallback(async () => {
        try {
            await handleRemoveGroup({
                optimisticResponse: {
                    groupRemove: {
                        group: {
                            _id: groupId,
                            __typename: 'Group',
                        },
                    },
                },
                update: (cache, { data: { groupRemove } }) => {
                    cache.evict(cache.identify(groupRemove.group));
                    history.replace('/dashboard/groups');
                },
                variables: {
                    _id: groupId,
                },
            });
        } catch (error) {
            console.error(error.message);
        }
    }, [groupId]);

    const addTag = useCallback(
        async tag => {
            try {
                await handleAddTag({
                    variables: {
                        _id: groupId,
                        name: tag,
                    },
                    optimisticResponse: {
                        groupAddTag: tag,
                    },
                    update: (cache, { data: { groupAddTag } }) =>
                        cache.modify({
                            id: cache.identify({ _id: groupId, __typename: 'Group' }),
                            fields: {
                                /**
                                 * !GOTCHA - Must use un-aliased names in cache.modify
                                 */
                                childTags(existing = { edges: [], count: 0 }, { readField }) {
                                    if (existing.edges.findIndex(({ node }) => readField('name', node) === groupAddTag) !== -1) {
                                        return existing;
                                    }

                                    const newTagNode = {
                                        name: groupAddTag,
                                        organization: currentUser.organization._id,
                                        __typename: 'Tag',
                                    };

                                    const newEdges = [
                                        ...existing.edges,
                                        {
                                            node: cache.writeFragment({
                                                data: newTagNode,
                                                fragment: gql`
                                                    fragment NewTag on Tag {
                                                        name
                                                        organization
                                                    }
                                                `,
                                            }),
                                            __typename: 'TagEdge',
                                        },
                                    ];
                                    return {
                                        ...existing,
                                        edges: newEdges,
                                        count: newEdges?.length,
                                    };
                                },
                            },
                        }),
                });
            } catch (error) {
                console.error(error.message);
            }
        },
        [currentUser, groupId]
    );

    const removeTag = useCallback(
        async tag => {
            try {
                const toRemove = tag.node.name;
                await handleRemoveTag({
                    variables: {
                        _id: groupId,
                        name: toRemove,
                    },
                    optimisticResponse: {
                        groupRemoveTag: toRemove,
                    },
                    update: (cache, { data: { groupRemoveTag } }) =>
                        cache.modify({
                            id: cache.identify({ _id: groupId, __typename: 'Group' }),
                            fields: {
                                childTags(existing = { edges: [], count: 0 }) {
                                    const removeRef = cache.identify({
                                        name: groupRemoveTag,
                                        organization: currentUser.organization._id,
                                        __typename: 'Tag',
                                    });

                                    const newEdges = existing.edges.filter(({ node: { __ref } }) => __ref !== removeRef);

                                    return {
                                        ...existing,
                                        edges: newEdges,
                                        count: newEdges?.length,
                                    };
                                },
                            },
                        }),
                });
            } catch (error) {
                console.log(error.message);
            }
        },
        [groupId]
    );

    return {
        addTag,
        removeTag,
        updating,
        updateError,
        updateGroup,
        addMember,
        addingMember,
        removeMember,
        removingMember,
        removing,
        removeGroup,
    };
};

export default useGroupActions;
