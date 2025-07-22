import type { State } from './types'
import createSSG from '@dmtkpv/ssg/createSSG'

const ssg = await createSSG();
await ssg('/', { version: 1 } as State);