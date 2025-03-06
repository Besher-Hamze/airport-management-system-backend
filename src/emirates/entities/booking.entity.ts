import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne, 
    JoinColumn 
  } from 'typeorm';
  import { Flight } from './flight.entity';
  
  @Entity('bookings')
  export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    bookingNumber: string;
  
    @ManyToOne(() => Flight, flight => flight.bookings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'flightId' })
    flight: Flight;
  
    @Column()
    flightId: string;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column()
    passport: string;
  
    @Column()
    birthDate: string;
  
    @Column()
    nationality: string;
  
    @Column()
    phone: string;
  
    @Column()
    email: string;
  
    @Column()
    seat: string;
  
    @Column({ default: 'confirmed' })
    status: string;
  
    @Column({ nullable: true, type: 'text' })
    passportFile: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }