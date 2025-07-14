import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { MiniChart } from '@/components/ui/mini-chart';

const Index = () => {
  const [oilPrices] = useState({
    wti: {
      price: 73.45,
      change: 2.15,
      changePercent: 3.02,
      volume: '2.4M',
      high: 74.82,
      low: 71.23,
      open: 71.89,
      chartData: [71.2, 71.8, 72.3, 71.9, 72.4, 73.1, 72.8, 73.5, 73.2, 73.8, 74.1, 73.9, 73.4]
    },
    brent: {
      price: 78.92,
      change: 1.87,
      changePercent: 2.43,
      volume: '3.1M',
      high: 79.65,
      low: 76.88,
      open: 77.12,
      chartData: [76.8, 77.2, 77.8, 77.4, 78.1, 78.6, 78.2, 78.9, 79.1, 78.7, 79.2, 78.8, 78.9]
    }
  });

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatChange = (change: number, percent: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${percent.toFixed(2)}%)`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const PriceCard = ({ type, data }: { type: 'wti' | 'brent', data: any }) => {
    const title = type === 'wti' ? 'WTI Crude Oil' : 'Brent Crude Oil';
    const description = type === 'wti' ? 'West Texas Intermediate' : 'North Sea Brent';
    
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            {title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-foreground">
              {formatPrice(data.price)}
            </div>
            <Badge 
              variant={data.change >= 0 ? "default" : "destructive"}
              className={`${getChangeColor(data.change)} bg-secondary`}
            >
              {formatChange(data.change, data.changePercent)}
            </Badge>
          </div>
          
          <div className="mb-4">
            <MiniChart 
              data={data.chartData} 
              color={data.change >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'} 
              height={60}
              className="mb-2"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Открытие:</span>
              <span className="text-foreground">{formatPrice(data.open)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Объём:</span>
              <span className="text-foreground">{data.volume}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Максимум:</span>
              <span className="text-foreground">{formatPrice(data.high)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Минимум:</span>
              <span className="text-foreground">{formatPrice(data.low)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Icon name="TrendingUp" size={36} className="text-primary" />
            Нефтяная панель
          </h1>
          <p className="text-xl text-muted-foreground">
            Отслеживание цен на нефть WTI и Brent в реальном времени
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Icon name="BarChart3" size={16} />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <Icon name="GitCompare" size={16} />
              Сравнение
            </TabsTrigger>
            <TabsTrigger value="forecast" className="flex items-center gap-2">
              <Icon name="LineChart" size={16} />
              Прогнозы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PriceCard type="wti" data={oilPrices.wti} />
              <PriceCard type="brent" data={oilPrices.brent} />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Activity" size={20} className="text-primary" />
                  Рыночная активность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-sm text-muted-foreground">Спред WTI-Brent</div>
                    <div className="text-2xl font-bold text-foreground">
                      ${(oilPrices.brent.price - oilPrices.wti.price).toFixed(2)}
                    </div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-sm text-muted-foreground">Общий объём</div>
                    <div className="text-2xl font-bold text-foreground">5.5M</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-sm text-muted-foreground">Волатильность</div>
                    <div className="text-2xl font-bold text-foreground">2.8%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="GitCompare" size={20} className="text-primary" />
                  Сравнение сортов нефти
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">WTI (West Texas Intermediate)</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Лёгкая сладкая нефть</li>
                        <li>• Добывается в США</li>
                        <li>• Эталон для американского рынка</li>
                        <li>• Низкое содержание серы</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">Brent (North Sea Brent)</h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Морская нефть Северного моря</li>
                        <li>• Добывается в Великобритании</li>
                        <li>• Международный эталон</li>
                        <li>• Немного тяжелее WTI</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-secondary rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Разница в цене:</span>
                      <span className="text-lg font-bold">
                        ${(oilPrices.brent.price - oilPrices.wti.price).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Brent торгуется с премией к WTI
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="LineChart" size={20} className="text-primary" />
                  Прогнозы и тренды
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-secondary rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="TrendingUp" size={16} className="text-green-500" />
                        Краткосрочный прогноз
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">WTI (1 неделя):</span>
                          <span className="text-green-500 font-medium">$75-77</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Brent (1 неделя):</span>
                          <span className="text-green-500 font-medium">$80-82</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-secondary rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Icon name="Calendar" size={16} className="text-blue-500" />
                        Среднесрочный прогноз
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">WTI (1 месяц):</span>
                          <span className="text-blue-500 font-medium">$70-80</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Brent (1 месяц):</span>
                          <span className="text-blue-500 font-medium">$75-85</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-secondary rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="AlertCircle" size={16} className="text-yellow-500" />
                      Ключевые факторы влияния
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium mb-2">Поддерживающие факторы:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Решения ОПЕК+</li>
                          <li>• Восстановление спроса</li>
                          <li>• Геополитическая напряжённость</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Сдерживающие факторы:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Рост добычи в США</li>
                          <li>• Экономические риски</li>
                          <li>• Увеличение запасов</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;