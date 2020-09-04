const tree = [
  {title: '中图', key: '0', children: [
    {title: '北京市', key: '0-1', children: [
      {title: '朝阳区', key: '0-1-0'},
      {title: '海淀区', key: '0-1-1'},
      {title: '东城区', key: '0-1-2'},
      {title: '西城区', key: '0-1-3'},
    ]},
    {title: '天津市', key: '0-2'}
  ]}
]
export default (req, res) => {
  res.statusCode = 200
  res.json(tree)
}