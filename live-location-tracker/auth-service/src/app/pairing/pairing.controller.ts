import { Controller, Post, Body } from '@nestjs/common';
import { PairingService } from './pairing.service';
import { CreatePairingCodeDto } from './dto/create-pairing-code.dto';
import { VerifyPairingCodeDto } from './dto/verify-pairing-code.dto';

@Controller('pairing')
export class PairingController {
    constructor(private readonly pairingService: PairingService) { }

    @Post('code')
    createCode(@Body() createPairingCodeDto: CreatePairingCodeDto) {
        return this.pairingService.createCode(createPairingCodeDto);
    }

    @Post('verify')
    verifyCode(@Body() verifyPairingCodeDto: VerifyPairingCodeDto) {
        return this.pairingService.verifyCode(verifyPairingCodeDto);
    }
}
