import './App.css'
import {useState} from 'react'
import axios from 'axios'

function App() {
  
  const [calc, setCalc] = useState('')
  const [result, setResult] = useState('')
  const [usd, setUsd] = useState('')
  const [eur, setEuro] = useState('')
  const [gbp, setGbp] = useState('')

  const ops = ['/', '*', '-', '+', '.']

  const updateCalc = value => {
    if (
      ops.includes(value) && calc === '' ||
      ops.includes(value) && ops.includes(calc.slice(-1))
       ) {return}
    setCalc(calc + value)   

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString())
    }
  }

  const createDigits = () => {
    const digits = []

    for (let i = 1; i < 10; i++) {
        digits.push(
          <button 
          onClick={() => updateCalc(i.toString())} 
          key={i}>
          {i}</button>
        )
    }

    return digits
  }

  const calculate = () => {
    setCalc(eval(calc).toString())
  }

  const deleteLast = () => {
    if (calc == '') {
      return
    }
    const value = calc.slice(0, -1)
    setCalc(value)
  }

  axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
  .then(data => {
    setUsd((data.data.Valute.USD.Value).toFixed(2))
    setEuro((data.data.Valute.EUR.Value).toFixed(2))
    setGbp((data.data.Valute.GBP.Value).toFixed(2))
  })

  return (
    <div className="App">
      <div className='calculator' style={{wordBreak: 'break-all'}}>
        <div className='screen'>
          {result ? <span>({result})</span> : ''}&nbsp; 
          {calc || '0'}
        </div>

        <div className='operators'>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('/')}>/</button>

          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className='digits'>
          {createDigits()}  
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>

          <button onClick={calculate}>=</button>
        </div>
      </div>

    <div className='convert'>
      <span>Курс валют</span> 
      <div className='usd'>
      <span style={{marginLeft: '15px'}}>Доллар США:</span>  
      <span style={{position: 'relative', top: '60px', marginLeft: '-90px', color: '#cf2b2b'}}>{usd}₽</span>
    </div>

    <div className='usd'>
      <span style={{marginLeft: '15px'}}>Евро:</span>  
      <span style={{position: 'relative', top: '60px', marginLeft: '-15px', color: '#cf2b2b'}}>{eur}₽</span> 
    </div>

    <div className='usd'>
      <span style={{marginLeft: '15px'}}>Фунт стерлингов:</span>  
      <span style={{position: 'absolute', marginTop: '60px', marginLeft: '-125px', color: '#cf2b2b'}}>{gbp}₽</span> 
    </div>
    </div>
    </div>
  );
}

export default App;
