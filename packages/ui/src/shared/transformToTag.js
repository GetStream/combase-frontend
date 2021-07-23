import slugify from 'slugify';

const transformToTag = value => slugify(value, { lower: true });

export default transformToTag;
