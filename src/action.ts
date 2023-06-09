import * as core from '@actions/core'
import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'
import type { Options } from './options'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function writeTo(content: any, k: any, filePath: any) {
  const yamlString = yaml.dump(content)
  fs.writeFileSync(filePath, yamlString, 'utf8')
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function loopThroughObjRecurs(obj: any, parseObject: any) {
  for (const k in obj) {
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      loopThroughObjRecurs(obj[k], parseObject[k])
    } else if (obj.hasOwnProperty(k)) {
      parseObject[k] = obj[k]
    }
  }
}

export async function run(options: Options): Promise<void> {
  try {
    for (const [file, values] of Object.entries(options.changes)) {
      core.info(`action inputsssssssss ${file} ... ${values}`)
      const filePath = path.join(process.cwd(), file)
      const yaml_data = yaml.load(fs.readFileSync(filePath, 'utf8'))
      const jsonObject = JSON.stringify(yaml_data, null, 4)
      const parseObject = JSON.parse(jsonObject)

      loopThroughObjRecurs(values, parseObject)
      writeTo(parseObject, file, filePath)
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}
