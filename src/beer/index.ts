import { BeerModel } from "../schemas/beer";
import { Beer } from "../models/beer.model";
import { Body, Controller, Delete, Get, Post, Put, Route } from "tsoa";

@Route("/beer")
export class BeerController extends Controller {
  @Get()
  public async getAll(): Promise<Beer[]> {
    try {
      let beers: any = await BeerModel.find({});
      beers = beers.map((beer) => {
        return {
          id: beer._id,
          name: beer.name,
          style: beer.style,
          alcoholContent: beer.alcoholContent,
          description: beer.description,
        };
      });
      return beers;
    } catch (err) {
      this.setStatus(500);
      console.error("Cought error: ", err);
    }
  }

  @Post()
  public async create(
    @Body()
    requestBody: {
      name: string;
      style: string;
      alcoholContent: string;
      description: string;
    }
  ): Promise<void> {
    const beer = new BeerModel(requestBody);

    await beer.save();
  }

  @Put("/{id}")
  public async update(
    id: string,
    @Body()
    requestBody: {
      name: string;
      style: string;
      alcoholContent: string;
      description: string;
    }
  ): Promise<void> {
    await BeerModel.findByIdAndUpdate({ _id: id }, requestBody);
  }

  @Delete("/{id}")
  public async delete(id: string): Promise<void> {
    await BeerModel.findByIdAndRemove(id);
  }
}
