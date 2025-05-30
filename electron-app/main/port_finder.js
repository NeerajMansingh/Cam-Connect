async function port_getter()
{
    const getPort = (await import('get-port')).default;
    const free_port = await getPort();
    console.log(free_port);
    return free_port;
}

module.exports={
    port_getter,
}