const Pricing = () => {
  const prices = [
    { service: 'Гостиница (передержка)', day: '8 000 – 15 000 ₸', week: '50 000 – 90 000 ₸', month: '180 000 – 300 000 ₸' },
    { service: 'Ветеринарный осмотр', day: '3 000 – 7 000 ₸', week: '—', month: '—' },
    { service: 'Груминг (полный уход)', day: '5 000 – 10 000 ₸', week: '—', month: '—' },
    { service: 'Спецтакси (за поездку)', day: '2 000 – 5 000 ₸', week: '—', month: '—' }
  ];

  return (
    <div className="container reveal" style={{ padding: '50px 0' }}>
      <h2>Цены на услуги VetVoyage</h2>
      <p>Стоимость услуг зависит от размера питомца и выбранного пакета обслуживания.</p>
      
      <div className="table-wrapper reveal">
        <table className="pricing-table">
          <thead>
          <tr>
            <th>Вид услуги</th>
            <th>День / Разово</th>
            <th>Неделя</th>
            <th>Месяц</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((p, idx) => (
            <tr key={idx} className="reveal">
              <td>{p.service}</td>
              <td>{p.day}</td>
              <td>{p.week}</td>
              <td>{p.month}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="reveal" style={{ marginTop: '30px' }}>
        <h3>Преимущества нашего сервиса:</h3>
        <ul>
          <li>Круглосуточное ветеринарное наблюдение в гостинице.</li>
          <li>Безопасная перевозка в специализированных боксах.</li>
          <li>Использование профессиональной косметики при груминге.</li>
          <li>Система лояльности для постоянных клиентов.</li>
        </ul>
      </div>
    </div>
  );
};

export default Pricing;
