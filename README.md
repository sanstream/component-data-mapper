# data-kraai
A generic and flexible way to map any type of data into any type of component. 


DataKraai offers a tool and methodology for mapping data into component and keeping those components as generic as possible.

# Inspiration
In my work I do a lot of data visualisation and need to make them re-usable. In it I frequently ran into the problem that data was mapped into the component directly, making it not re-usable. For this purpose I came up with a way to generalise how data is given to component, which resulted in DataKraai.

## About the name
Instead of using a name like `component-data-mapper`, I prefered to use something more easy to remember. With that in mind I looked for
inspiration into my favourite subject, biology.

'Kraai' is the Dutch word for crow. Crows are highly resourceful and flexible creatures and can easily adapt to new situations. This flexible nature is what they share with this tool. So I named it data-kraai. Like a crow that is flexible with data. Get it?

Also crows are awesome. 

# Using data-kraai
Take for example this bit of data:
```js
// crowData.js
const crows: [
  {
    name: 'Steve',
    gender: 'male',
    birthDay: '2016-12-10 00:00:00Z',
  },
  {
    name: 'Gertrude',
    gender: 'female',
    birthDay: '2016-12-11 00:00:00Z',
  },
]
```

This is how you would define a data mapping:
```js
// mappings.js
import DataKraai from 'data-kraai'
import { Duration, DateTime } from 'luxon'

// corresponds to the order of the table columns.
// please note that this example is specific to tables:
const tableOrdering = [
  'name',
  'gender'
  'age',
]

// how to define data mapping with DataKraai:
const tableDataMapping = {
  'name': new DataKraai({
    label: 'Crow\'s name',
    mapper: crowDataPoint => crowDataPoint.name,
  }),
  'gender': new DataKraai({
    label: 'Gender',
    mapper: crowDataPoint => crowDataPoint.gender,
  }),
  'age': new DataKraai({
    label: 'Age',
    labelExplanation: 'The age is represented in years.' // although labelExplanation is not part of the DataKraai parameters it still allows you to pass parameters like that.
    mapper: crowDataPoint => {
      const birthDay = DateTime.fromISO(crowDataPoint.dateOfBirth)
      const now = DateTime.fromMillis(Date.now())
      // returns difference in years (as integers):
      return birthDay.diff(now, 'years')
  }),
}

```

The variables `ordering` and `dataMapping` can in turn be provided as props to component like so:

```vue
<template>
<your-generic-table-component
  :dataMapping="dataMapping"
  :ordering="ordering"
  :rawData="crowData"
></your-generic-table-component>
<your-generic-piechart-component
  :dataMapping="dataMapping"
  :ordering="someOtherOrdering"
  :rawData="crowData"
></your-generic-piechart-component>
</template>
```

In each component your would in turn define how data can be extracted:


```vue
<template>
  <table>
    <thead>
      <tr>
        <!--
        dataMapping[id].labelExplanation is not always present aka undefined
        vue handles this by simply not applying the title attribute,
        is exactly the desired behaviour.
        -->
        <th
          v-for="id in ordering"
          :key="id"
          :title="dataMapping[id].labelExplanation"
        >
          {{dataMapping[id].label}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rawData">
        <!-- use ordering to put all the bits in the desired order: -->
        <td
          v-for="id in ordering"
          :key="id"
        >
          <!-- combine ordering id with the getData method to auto extract your data. -->
          <!-- getData feeds the row into the mapper defined earlier in mappings.js for each id. -->
          {{dataMapping[id].getData(row)}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import DataKraai from 'data-kraai'
import { ordering, dataMapping } from './path/to/your/mapppings'
import VueTypes from 'vue-types'

/**
 * A generic table component.
 */
export default {
  name: 'your-generic-piechart-component',

  props: {
    ordering: VueTypes.arrayOf(VueTypes.string.isRequired).isRequired,
    dataMapping: VueTypes.objectOf(VueTypes.instanceOf(DataKraai).isRequired).isRequired,
    rawData: VueTypes.array.isRequired,
  },

}
</script>

```

Althought the example above uses a vue component, DataKraai works with every type of component (Vue, React, etc). In other words it is framework agnostic.

# Roadmap
- Include generic way to pass along a desired formatting type (like 'date', datetime, 'currency', 'age').
- Add a default placeholder token to show when no data can be found / extracted using the mappers.

# Disclaimer
The source code will be filled with crow related puns.

# Credits
Thanks to my wife for helping me coming up with this tool's name.
