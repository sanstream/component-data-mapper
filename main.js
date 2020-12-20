export default class DataKraai {
  constructor ({
    label,
    mapper,
    dataRange,
    dataRangeLabels,
  }) {
    this.label = label
    this.mapper = mapper
    this.dataRange = dataRange || null
    this.dataRangeLabels = dataRangeLabels || null
  }

  getData (dataObject) {
    const result = null
    try {
      return this.mapper(dataObject)
    } catch (error) {
      console.warn(error)
      return result
    }
  }
}