
export default {
  data() { return {} },
  props: ['count','index'],
  methods: {
  },
  template: `
    <h1>
       {{2024 + Math.floor((index+1)/12)}}/{{(index+1)%12 + 1}}: {{ count }} 回
    </h1>`
}