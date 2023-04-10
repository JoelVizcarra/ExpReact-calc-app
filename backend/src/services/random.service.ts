require('dotenv').config();

import axios from 'axios';
import config from 'config';

export type Options = {
  num: number;
  len: number;
};

const { randomOrgApiKey, randomOrgApiUrl } = config.get<{
  randomOrgApiKey: string;
  randomOrgApiUrl: string;
}>('services');

const fetchRandomString = async (options: Options) =>
  axios.get<string>(`${randomOrgApiUrl}/strings`, {
    params: {
      digits: 'on',
      upperalpha: 'on',
      loweralpha: 'on',
      unique: 'on',
      format: 'plain',
      ...options,
    },
  });

export default fetchRandomString;
