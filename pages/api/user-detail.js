const list = [
  {key: '1', name: '张三', age: 20, address: '北京市朝阳区'},
  {key: '2', name: '李四', age: 21, address: '北京市海淀区'},
  {key: '3', name: '王五', age: 22, address: '北京市海淀区'},
  {key: '4', name: '张三1', age: 20, address: '北京市朝阳区'},
  {key: '5', name: '李四2', age: 21, address: '北京市海淀区'},
  {key: '6', name: '王五3', age: 22, address: '北京市海淀区'},
]

export default (req, res) => {
  const {body: {key}} = req
  res.statusCode = 200
  res.json(list.filter(x =>x.key === key)[0])
}