export const getChannel = async (client, type, id) => {
    const channel = client.channel(type, id);

    await channel.watch();

    await channel.stopWatching();

    return channel;
};
