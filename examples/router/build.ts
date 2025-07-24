import createSSG from '@dmtkpv/ssg/createSSG'

async function build () {
    const ssg = await createSSG();
    await ssg('/');
    await ssg('/info');
}

build().catch(e => {
    console.log(e)
})
