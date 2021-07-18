export default class DataKraai {
  constructor ({
    label,
    mapper,
    dataRange,
    dataRangeLabels,
    ...otherProps
  }) {
    // Allow props to simply be passed along.
    // This allows an even larger degree of flexibility.
    Object.assign(this , {
      ...otherProps
    })
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