// import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
// import { User, UserDocument } from './schemas/user.schema';
// import { RegisterDto, UpdateUserDto } from './dto/auth.dto';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectModel(User.name, 'sham')
//     private userModel: Model<UserDocument>
//   ) {}

//   async create(registerDto: RegisterDto): Promise<User> {
//     const { email, password } = registerDto;

//     // Check if user with this email already exists
//     const existingUser = await this.userModel.findOne({ email });
//     if (existingUser) {
//       throw new ConflictException('Email already in use');
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const user = new this.userModel({
//       ...registerDto,
//       password: hashedPassword,
//     });

//     return user.save();
//   }

//   async findAll(): Promise<User[]> {
//     return this.userModel.find().exec();
//   }

//   async findOne(id: string): Promise<User> {
//     const user = await this.userModel.findById(id).exec();
//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//     return user;
//   }

//   async findByEmail(email: string): Promise<User> {
//     const user = await this.userModel.findOne({ email }).exec();
//     if (!user) {
//       throw new NotFoundException(`User with email ${email} not found`);
//     }
//     return user;
//   }

//   async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
//     // If password is being updated, hash it
//     if (updateUserDto.password) {
//       updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
//     }

//     // If email is being updated, check if it's already in use
//     if (updateUserDto.email) {
//       const existingUser = await this.userModel.findOne({ 
//         email: updateUserDto.email,
//         _id: { $ne: id }
//       }).exec();

//       if (existingUser) {
//         throw new ConflictException('Email already in use');
//       }
//     }

//     const updatedUser = await this.userModel
//       .findByIdAndUpdate(id, updateUserDto, { new: true })
//       .exec();

//     if (!updatedUser) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }

//     return updatedUser;
//   }

//   async remove(id: string): Promise<void> {
//     const result = await this.userModel.deleteOne({ _id: id }).exec();
//     if (result.deletedCount === 0) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//   }

//   async addFavoriteAirport(userId: string, airportId: string): Promise<User> {
//     const user = await this.findOne(userId);
    
//     if (!user.favoriteAirports.includes(airportId)) {
//       user.favoriteAirports.push(airportId);
//       return this.userModel.findByIdAndUpdate(
//         userId,
//         { favoriteAirports: user.favoriteAirports },
//         { new: true }
//       ).exec();
//     }
    
//     return user;
//   }

//   async removeFavoriteAirport(userId: string, airportId: string): Promise<User> {
//     const user = await this.findOne(userId);
    
//     const updatedFavorites = user.favoriteAirports.filter(id => id !== airportId);
    
//     return this.userModel.findByIdAndUpdate(
//       userId,
//       { favoriteAirports: updatedFavorites },
//       { new: true }
//     ).exec();
//   }

//   async addRecentSearch(
//     userId: string, 
//     from: string, 
//     to: string, 
//     date: string
//   ): Promise<User> {
//     const user = await this.findOne(userId);
    
//     const newSearch = {
//       from,
//       to,
//       date,
//       timestamp: new Date(),
//     };
    
//     // Keep only the 5 most recent searches
//     const recentSearches = [
//       newSearch, 
//       ...user.recentSearches.slice(0, 4)
//     ];
    
//     return this.userModel.findByIdAndUpdate(
//       userId,
//       { recentSearches },
//       { new: true }
//     ).exec();
//   }
// }