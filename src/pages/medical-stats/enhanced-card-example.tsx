import { FC } from 'react';
import { Card, CardHeader, Typography, Grid } from '@mui/material';
import { ScrollableCardContent } from '../../components/common';

/**
 * Example component showing how to use the ScrollableCardContent for medical stats
 */
export const EnhancedStatsCard: FC<{
  title: string;
  data: { category: string; value: number }[];
  maxHeight?: string | number;
}> = ({ title, data, maxHeight = '300px' }) => {
  return (
    <Card>
      <CardHeader title={title} />
      <ScrollableCardContent maxHeight={maxHeight}>
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="subtitle1">{item.category}</Typography>
              <Typography variant="h6" color="primary">{item.value}</Typography>
            </Grid>
          ))}
        </Grid>
      </ScrollableCardContent>
    </Card>
  );
};

export default EnhancedStatsCard;
