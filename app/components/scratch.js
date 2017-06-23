<div className="variableTable">
    <div className="title">Current Variables</div>
    <ul>
      { _.map(_.sortBy(variables, (v) => {
          return v.order;
      }),
        (x) => {
            return <li><span className="three_quarter name">{ x.name }</span><span className="quarter">{ x.value }</span></li>;
        })}
    </ul>
</div>

<FunctionSearch />
<div className="func_info">
  <div className="func_title">{doc.title}</div>
  <div className="func_description">
    {doc.description.map(p => <div>{p}</div>)}
  </div>
  <div className="examples">
    <div className="head">EXAMPLES:</div>
    {doc.examples.map(ex => <div className="example">{ex}</div>)}
  </div>
  <div className="func_code">
    <div className="head">CODE:</div>
    <pre>
    def add_two_numbers(x,y): return x + y
    </pre>
  </div>
</div>
