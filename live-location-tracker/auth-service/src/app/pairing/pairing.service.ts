import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePairingCodeDto } from './dto/create-pairing-code.dto';
import { VerifyPairingCodeDto } from './dto/verify-pairing-code.dto';

@Injectable()
export class PairingService {
    // In-memory storage for simplicity in this phase
    // In production, use Redis
    private activeCodes = new Map<string, string>(); // code -> userId
    private pairedDevices = new Map<string, string[]>(); // userId -> [deviceIds]

    createCode(createPairingCodeDto: CreatePairingCodeDto) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        this.activeCodes.set(code, createPairingCodeDto.userId);

        // Code expires in 5 minutes
        setTimeout(() => {
            this.activeCodes.delete(code);
        }, 5 * 60 * 1000);

        return { code, expiresIn: 300 };
    }

    verifyCode(verifyPairingCodeDto: VerifyPairingCodeDto) {
        const { code, deviceId } = verifyPairingCodeDto;
        const userId = this.activeCodes.get(code);

        if (!userId) {
            throw new NotFoundException('Invalid or expired code');
        }

        // Link device to user
        const devices = this.pairedDevices.get(userId) || [];
        if (!devices.includes(deviceId)) {
            devices.push(deviceId);
            this.pairedDevices.set(userId, devices);
        }

        // Invalidate code after use
        this.activeCodes.delete(code);

        return { status: 'success', userId, token: 'mock-jwt-token-for-' + userId };
    }
}
