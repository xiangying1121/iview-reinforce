<template>
  <div>
    <r-filter-table
      :data="data"
      :columns="columns"
      @on-search="handleSearch"
      :page="true"
      :total="pageInfo.total"
      :current="pageInfo.page"
      :page-size="pageInfo.limit"
      @on-change="handlePage"
      @on-page-size-change="handlePageSize"
    >
      <template slot="action" slot-scope="{ row }">
        <a @click="handleModal(row)">编辑</a>&nbsp;
        <a @click="handleRemove(row)">删除</a>&nbsp;
        <!-- <Dropdown transfer ref="dropdown" @on-click="handleClick($event, row)">
          <a href="javascript:void(0)">
            <span>更多</span>
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="sendToEmail">发送到密保邮箱</DropdownItem>
          </DropdownMenu> </Dropdown
        >&nbsp; -->
      </template>
    </r-filter-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: 'Name',
          key: 'name',
          filter: {
            type: 'Select',
            options: {
              filters: [
                {
                  label: 'Joe',
                  value: 1,
                },
                {
                  label: 'John',
                  value: 2,
                },
              ],
              filterMultiple: false,
              filterMethod(value, row) {
                if (value === 1) {
                  return row.name === 'Joe'
                } else if (value === 2) {
                  return row.name === 'John Brown'
                }
              },
            },
          },
        },
        {
          title: 'Agpe',
          key: 'age',
          filter: {
            type: 'Input',
          },
        },
        {
          title: 'Address',
          key: 'address',
          filters: [
            {
              label: 'Joe',
              value: 1,
            },
            {
              label: 'John',
              value: 2,
            },
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.name === 'Joe'
            } else if (value === 2) {
              return row.name === 'John Brown'
            }
          },
        },
        {
          title: 'Date',
          key: 'date',
          filter: {
            type: 'Date',
          },
        },
        {
          title: '操作',
          slot: 'action',
          fixed: 'right',
          width: 150,
        },
      ],
      data: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02',
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
        },
      ],
      pageInfo: {
        total: 0,
        page: 1,
        limit: 10,
      },
    }
  },
  methods: {
    handleSearch(params) {
      console.log(params)
    },
    handlePage(current) {
      this.pageInfo.page = current
      this.handleSearch()
    },
    handlePageSize(size) {
      this.pageInfo.limit = size
      this.handleSearch()
    },
  },
}
</script>
