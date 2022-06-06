import MakerBase, { MakerOptions } from '@electron-forge/maker-base';
import { ForgeArch, ForgePlatform } from '@electron-forge/shared-types';
import { MakerFlatpakConfig } from './Config';
export declare function flatpakArch(nodeArch: ForgeArch): string;
export default class MakerFlatpak extends MakerBase<MakerFlatpakConfig> {
    name: string;
    defaultPlatforms: ForgePlatform[];
    requiredExternalBinaries: string[];
    isSupportedOnCurrentPlatform(): boolean;
    make({ dir, makeDir, targetArch }: MakerOptions): Promise<string[]>;
}
//# sourceMappingURL=MakerFlatpak.d.ts.map