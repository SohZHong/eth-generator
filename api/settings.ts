import config from "../config";
import { Alchemy } from 'alchemy-sdk';

const settings = {
    apiKey: config.alchemyApiKey,
    network: config.network,
};

export const alchemy = new Alchemy(settings);