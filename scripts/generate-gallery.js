const fs = require('node:fs')
const path = require('node:path')

const projectRoot = path.resolve(__dirname, '..')
const galleryRoot = path.join(projectRoot, 'public/images/success-case')
const outputFile = path.join(projectRoot, 'src/data/cases-gallery-generated.js')
const imageExtensions = new Set(['.gif', '.jpeg', '.jpg', '.png', '.webp'])
const safeNamePattern = /^[A-Za-z0-9][A-Za-z0-9._-]*$/

if (!fs.existsSync(galleryRoot)) {
  throw new Error(`Success case image directory does not exist: ${galleryRoot}`)
}

const folders = fs.readdirSync(galleryRoot, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .sort()

const galleryMap = {}

for (const folder of folders) {
  if (!safeNamePattern.test(folder)) {
    throw new Error(`OSS-unsafe gallery folder name: ${folder}`)
  }

  const folderPath = path.join(galleryRoot, folder)
  const images = fs.readdirSync(folderPath, { withFileTypes: true })
    .filter(entry => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map(entry => entry.name)
    .sort()

  for (const image of images) {
    if (!safeNamePattern.test(image)) {
      throw new Error(`OSS-unsafe image file name: ${folder}/${image}`)
    }
  }

  galleryMap[folder] = images.map(image => `/images/success-case/${folder}/${image}`)
}

const lines = [
  '/**',
  ' * ⚠️ 此文件由 scripts/generate-gallery.js 自动生成',
  ' * 不要手动修改！往 public/images/success-case/项目文件夹/ 里放图片即可',
  ' */',
  '',
  'export const galleryMap = {'
]

for (const [folder, images] of Object.entries(galleryMap)) {
  lines.push(`  '${folder}': [`)
  for (const image of images) {
    lines.push(`    '${image}',`)
  }
  lines.push('  ],')
}

lines.push('}', '')

const generatedContent = lines.join('\n')
const currentContent = fs.existsSync(outputFile) ? fs.readFileSync(outputFile, 'utf8') : ''

if (currentContent !== generatedContent) {
  fs.writeFileSync(outputFile, generatedContent)
  console.log(`Generated ${path.relative(projectRoot, outputFile)}`)
} else {
  console.log('Success case gallery is up to date')
}
