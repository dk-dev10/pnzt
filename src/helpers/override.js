const path = require('path')
const fs = require('fs')

const districtsPath = path.join(__dirname, 'federalDistricts.json')
const featuresPath = path.join(__dirname, 'newMapFinal.json')

const districts = JSON.parse(fs.readFileSync(districtsPath, 'utf8'))
const features = JSON.parse(fs.readFileSync(featuresPath, 'utf8'))

const data = districts.districts.map(district => {
	return {
		name: district.name,
		regions: district["hc-keys"].map(hckey =>
			features.features.find(feature => {
				return feature.properties["hc-key"] === hckey
			})?.properties.name)
	}
})
try {
	fs.writeFileSync(path.join(__dirname, 'districts.json'), JSON.stringify(data))
	console.log('File saved successfully!')
} catch (err) {
	console.error(err)
}
