const Pricing = () => {
  const priceList = [
    { service: 'Гостиница (Стандарт)', price: 'от 5 000 ₸ / день', features: 'Питание, прогулки 2 раза в день' },
    { service: 'Гостиница (Luxe)', price: 'от 8 000 ₸ / день', features: 'Видеонаблюдение, индивидуальное меню' },
    { service: 'Ветеринарный осмотр', price: 'от 3 000 ₸', features: 'Первичная консультация врача' },
    { service: 'Груминг (Полный комплекс)', price: 'от 7 000 ₸', features: 'Стрижка, мытье, когти, уши' },
    { service: 'Спецтакси (по городу)', price: 'от 2 500 ₸', features: 'Комфортная перевозка в боксе' },
  ];

  return (
    <section className="bg-white">
      <div className="container reveal">
        <div className="section-title">
          <h2>Услуги и Стоимость</h2>
          <p className="text-italic" style={{ marginTop: '20px' }}>Прозрачное ценообразование без скрытых платежей</p>
        </div>
        
        <div className="table-wrapper">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Услуга</th>
                <th>Описание</th>
                <th style={{ textAlign: 'right' }}>Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {priceList.map((item, index) => (
                <tr key={index}>
                  <td className="service-name">{item.service}</td>
                  <td className="features-cell">{item.features}</td>
                  <td className="price-cell">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p style={{ marginBottom: '20px' }}>Нужна индивидуальная консультация?</p>
          <a href="https://wa.me/77718637508" className="btn btn-outline" target="_blank" rel="noreferrer">
            Связаться в WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
