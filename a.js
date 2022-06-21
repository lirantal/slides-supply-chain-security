async function closeGracefully(signal) {
   console.log(`*^!@4=> Received signal to terminate: ${signal}`)
 
   await fastify.close()
   // await db.close() if we have a db connection in this app
   // await other things we should cleanup nicely
   process.kill(process.pid, signal);
}
process.once('SIGINT', closeGracefully)
process.once('SIGTERM', closeGracefully)