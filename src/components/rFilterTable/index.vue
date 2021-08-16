<template>
  <div ref="selection">
    <Table v-bind="$attrs" v-on="$listeners" :columns="filterColumns">
      <template
        v-for="column in filterColumns"
        :slot="column.slot || ''"
        slot-scope="params"
      >
        <slot :name="column.slot || ''" v-bind="params"></slot>
      </template>
    </Table>
    <Page
      v-if="page"
      transfer
      v-bind="$attrs"
      v-on="$listeners"
      show-elevator
      show-sizer
      show-total
    ></Page>
  </div>
</template>
<script>
export default {
  name: 'rFilterTable',
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    page: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filterColumns: [],
      params: {},
      searchInfo: {},
    }
  },
  created() {
    const searchInput = (h, params, that) => (
      <div class="search-area">
        <span class="r-ivu-title">{params.column.title}</span>
        <Poptip
          transfer={true}
          transfer={true}
          placement="bottom"
          offset={8}
          onOn-popper-hide={() => that.hancleCancle(params)}
        >
          <span class="ivu-table-filter">
            <Icon
              type="ios-funnel"
              class={that.searchInfo[params.column.key] ? 'on' : ''}
            />
          </span>
          <div slot="content">
            <div class="ivu-table-filter-list">
              <div class="ivu-table-filter-list-item">
                <Input
                  search
                  onOn-change={() => that.changeValue(params)}
                  v-model={params.column.value}
                />
              </div>
              <div class="pop-search-footer ivu-table-filter-footer">
                <Button
                  disabled={!params.column.value}
                  type="text"
                  onClick={() => that.setColumnParams(params)}
                >
                  筛选
                </Button>
                <Button
                  type="text"
                  onClick={() => that.setColumnParams(params, 'reset')}
                >
                  重置
                </Button>
              </div>
            </div>
          </div>
        </Poptip>
      </div>
    )

    const selectInput = (h, params, that) => (
      <div class="search-area">
        <span class="r-ivu-title">{params.column.title}</span>
        <Poptip
          popper-class="ivu-table-popper"
          transfer={true}
          placement="bottom"
          offset={8}
          onOn-popper-hide={() => that.hancleCancle(params)}
        >
          <span class="ivu-table-filter">
            <Icon
              type="ios-funnel"
              class={that.searchInfo[params.column.key] ? 'on' : ''}
            />
          </span>
          <div slot="content">
            <div class="ivu-table-filter-list">
              <div class="ivu-table-filter-list-item">
                <checkbox-group
                  onOn-change={() => that.changeValue(params)}
                  v-model={params.column.value}
                >
                  {params.column.filter.options.filters.map((item) => {
                    return <checkbox label={item.value}>{item.label}</checkbox>
                  })}
                </checkbox-group>
              </div>
              <div class="pop-search-footer ivu-table-filter-footer">
                <Button
                  disabled={
                    !params.column.value || params.column.value.length <= 0
                  }
                  type="text"
                  onClick={() => that.setColumnParams(params)}
                >
                  筛选
                </Button>
                <Button
                  type="text"
                  onClick={() => that.setColumnParams(params, 'reset')}
                >
                  重置
                </Button>
              </div>
            </div>
          </div>
        </Poptip>
      </div>
    )

    const radioInput = (h, params, that) => (
      <div class="search-area">
        <span class="r-ivu-title">{params.column.title}</span>
        <Poptip
          popper-class="ivu-table-popper"
          transfer={true}
          placement="bottom"
          offset={8}
          onOn-popper-hide={() => that.hancleCancle(params)}
        >
          <span class="ivu-table-filter">
            <Icon
              type="ios-funnel"
              class={that.searchInfo[params.column.key] ? 'on' : ''}
            />
          </span>
          <div slot="content">
            <div class="ivu-table-filter-list">
              <div class="ivu-table-filter-list-item">
                <radio-group
                  v-model={params.column.value}
                  vertical={true}
                  onOn-change={() => that.changeValue(params)}
                >
                  {params.column.filter.options.filters.map((item) => {
                    return <radio label={item.value}>{item.label}</radio>
                  })}
                </radio-group>
              </div>
              <div class="pop-search-footer ivu-table-filter-footer">
                <Button
                  disabled={
                    !params.column.value || params.column.value.length <= 0
                  }
                  type="text"
                  onClick={() => that.setColumnParams(params)}
                >
                  筛选
                </Button>
                <Button
                  type="text"
                  onClick={() => that.setColumnParams(params, 'reset')}
                >
                  重置
                </Button>
              </div>
            </div>
          </div>
        </Poptip>
      </div>
    )

    const datePicker = (h, params, that) => (
      <div class="search-area">
        <span class="r-ivu-title">{params.column.title}</span>
        <Poptip
          transfer={true}
          transfer={true}
          placement="bottom"
          offset={8}
          onOn-popper-hide={() => that.hancleCancle(params)}
        >
          <span class="ivu-table-filter">
            <Icon
              type="ios-funnel"
              class={that.searchInfo[params.column.key] ? 'on' : ''}
            />
          </span>
          <div slot="content">
            <div class="ivu-table-filter-list">
              <div class="ivu-table-filter-list-item">
                <DatePicker
                  v-model={params.column.value}
                  type={params.column.dateType}
                  onOn-change={() => that.changeValue(params)}
                  clearable={false}
                  editable={false}
                  style="width: 200px"
                ></DatePicker>
              </div>
              <div class="pop-search-footer ivu-table-filter-footer">
                <Button
                  disabled={!params.column.value}
                  type="text"
                  onClick={() => that.setColumnParams(params)}
                >
                  筛选
                </Button>
                <Button
                  type="text"
                  onClick={() => that.setColumnParams(params, 'reset')}
                >
                  重置
                </Button>
              </div>
            </div>
          </div>
        </Poptip>
      </div>
    )
    for (let index in this.columns) {
      let filter = this.columns[index]
      if (this.columns[index].filter) {
        if (this.columns[index].filter.type === 'Select') {
          if (
            this.columns[index].filter.options &&
            this.columns[index].filter.options.filterMultiple
          ) {
            filter = Object.assign(this.columns[index], {
              renderHeader: (h, params) => selectInput(h, params, this),
            })
          } else {
            filter = Object.assign(this.columns[index], {
              renderHeader: (h, params) => radioInput(h, params, this),
            })
          }
        } else if (this.columns[index].filter.type === 'Input') {
          filter = Object.assign(this.columns[index], {
            renderHeader: (h, params) => searchInput(h, params, this),
          })
        } else if (this.columns[index].filter.type === 'Date') {
          filter = Object.assign(this.columns[index], {
            renderHeader: (h, params) => datePicker(h, params, this),
            dateType: 'date',
          })
        }
        this.params[this.columns[index].key] = null
      }
      this.filterColumns.push(filter)
    }
  },
  methods: {
    changeValue(params) {
      this.$set(this.params, params.column.key, params.column.value)
    },
    hancleCancle(params) {
      console.log('hancleCancle')
      if (
        params.column.filter.type === 'Select' &&
        params.column.filter.options &&
        params.column.filter.options.filterMultiple
      ) {
        params.column.value = this.searchInfo[params.column.key] || []
      } else {
        params.column.value = this.searchInfo[params.column.key] || null
      }
      this.$set(this.params, params.column.key, params.column.value)
    },

    setColumnParams(params, type) {
      // 重置分页
      this.$refs.selection.click() // 隐藏pop弹框
      const key = params.column.key
      if (type === 'reset') {
        if (
          params.column.filter.type === 'Select' &&
          params.column.filter.options &&
          params.column.filter.options.filterMultiple
        ) {
          params.column.value = []
        } else {
          params.column.value = null
        }
        this.params[key] = null
        this.searchInfo[key] = null
        this.$set(this.searchInfo, params.column.key, null)
      } else {
        this.$set(this.searchInfo, params.column.key, params.column.value)
      }
      this.$forceUpdate()
      this.$emit('on-search', this.searchInfo)
    },
  },
}
</script>
<style lang="less">
.r-ivu-title {
  padding-right: 5px;
}
</style>
