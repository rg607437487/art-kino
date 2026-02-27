//
// TODO actual unit & integration tests
//

// import { readFileSync } from 'node:fs'
// import { Temporal } from '@js-temporal/polyfill'
// import * as cheerio from 'cheerio'
import { getCinemas } from '../src/getCinemas.ts'

// const html = readFileSync('./fixtures/atlas2.html', 'utf-8')
// const today = Temporal.Now.plainDateISO()

const res = await getCinemas()
console.log(res)
