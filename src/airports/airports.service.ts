import { Injectable } from '@nestjs/common';
import { Airport } from './interfaces/airport.interface';
import { ShamService } from '../sham/sham.service';
import { EmiratesService } from '../emirates/emirates.service';
import { QatarService } from '../qatar/qatar.service';

@Injectable()
export class AirportsService {
  private readonly airports: Airport[] = [
    {
      id: 'sham',
      name: 'مطار الشام',
      code: 'SHA',
      description: 'بوابتك إلى سوريا الجميلة، حيث تلتقي الحضارة العريقة بالخدمات العصرية',
      location: 'دمشق، سوريا',
      imageUrl: '/images/sham.png',
      stats: {
        flights: 24,
        destinations: 15,
      },
      features: ['صالات VIP', 'خدمة 24/7', 'مواقف مجانية']
    },
    {
      id: 'emirates',
      name: 'مطار الإمارات',
      code: 'EMA',
      description: 'اكتشف روعة دبي عبر مطار عالمي المستوى يجمع بين الفخامة والراحة',
      location: 'دبي، الإمارات',
      imageUrl: '/images/emirate.png',
      stats: {
        flights: 36,
        destinations: 28,
      },
      features: ['تسوق حر', 'مطاعم فاخرة', 'خدمة الليموزين']
    },
    {
      id: 'qatar',
      name: 'مطار قطر',
      code: 'QTA',
      description: 'تجربة سفر استثنائية في واحد من أفضل مطارات العالم',
      location: 'الدوحة، قطر',
      imageUrl: '/images/qatar.png',
      stats: {
        flights: 42,
        destinations: 32,
      },
      features: ['صالة رجال أعمال', 'خدمات صحية', 'نقل مجاني']
    }
  ];

  constructor(
    private readonly shamService: ShamService,
    private readonly emiratesService: EmiratesService,
    private readonly qatarService: QatarService,
  ) {}

  async getAllAirports(): Promise<Airport[]> {
    return this.airports;
  }

  async getAirportById(id: string): Promise<Airport> {
    return this.airports.find(airport => airport.id === id);
  }

  async getDashboardData(): Promise<any> {
    // Get flight counts from each airport
    const [shamFlights, emiratesFlights, qatarFlights] = await Promise.all([
      this.shamService.getAllFlights(),
      this.emiratesService.getAllFlights(),
      this.qatarService.getAllFlights(),
    ]);

    // Get booking counts from each airport
    const [shamBookings, emiratesBookings, qatarBookings] = await Promise.all([
      this.shamService.getAllBookings(),
      this.emiratesService.getAllBookings(),
      this.qatarService.getAllBookings(),
    ]);

    return {
      totalFlights: shamFlights.length + emiratesFlights.length + qatarFlights.length,
      totalBookings: shamBookings.length + emiratesBookings.length + qatarBookings.length,
      flightsByAirport: {
        sham: shamFlights.length,
        emirates: emiratesFlights.length,
        qatar: qatarFlights.length,
      },
      bookingsByAirport: {
        sham: shamBookings.length,
        emirates: emiratesBookings.length,
        qatar: qatarBookings.length,
      },
    };
  }

  async searchFlights(from: string, to: string, date: string): Promise<any[]> {
    // Get flights from each airport and filter them
    const [shamFlights, emiratesFlights, qatarFlights] = await Promise.all([
      this.shamService.getAllFlights(),
      this.emiratesService.getAllFlights(),
      this.qatarService.getAllFlights(),
    ]);

    const filtered = [
      ...shamFlights
        .filter(flight => 
          (!from || flight.from.includes(from)) && 
          (!to || flight.to.includes(to)) && 
          (!date || flight.date === date)
        )
        .map(flight => ({ ...flight, airport: 'sham' })),
      
      ...emiratesFlights
        .filter(flight => 
          (!from || flight.from.includes(from)) && 
          (!to || flight.to.includes(to)) && 
          (!date || flight.date === date)
        )
        .map(flight => ({ ...flight, airport: 'emirates' })),
      
      ...qatarFlights
        .filter(flight => 
          (!from || flight.from.includes(from)) && 
          (!to || flight.to.includes(to)) && 
          (!date || flight.date === date)
        )
        .map(flight => ({ ...flight, airport: 'qatar' })),
    ];

    return filtered;
  }
}