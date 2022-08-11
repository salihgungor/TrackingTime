import { Module, Logger } from "@nestjs/common";
import { AppModule } from "src/app.module";
import { Seeder } from "./seeder";
import { LanguageSeederModule } from "./user/user.module";

@Module({
    imports: [AppModule, LanguageSeederModule],
    providers: [Logger, Seeder],
  })
  export class SeederModule {}