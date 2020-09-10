const tableData = [
  {key: 1, name: '张3', age: 20, address: '北京市朝阳区'},
  {key: 2, name: '张4', age: 21, address: '北京市朝阳区'},
  {key: 3, name: '张5', age: 22, address: '北京市朝阳区'},
  {key: 4, name: '张6', age: 23, address: '北京市朝阳区'},
  {key: 5, name: '张7', age: 24, address: '北京市朝阳区'},
  {key: 6, name: '张8', age: 25, address: '北京市朝阳区'},
  {key: 7, name: '张9', age: 26, address: '北京市朝阳区'},
]

export default (req, res) => {
  const {body} = req
  console.log(body, 'body')
  res.statusCode = 200
  res.json({
    data: tableData,
    total: tableData.length,
  })
}