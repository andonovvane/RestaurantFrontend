import { useEffect, useState } from "react";
import { api } from "@/API/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const StatCard = ({ title, value, className = "" }) => (
    <Card className={`bg-zinc-800 text-white ${className}`}>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-2xl font-bold">{value}</p>
        </CardContent>
    </Card>
);

const CeoDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [period, setPeriod] = useState("week");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get(`/orders/stats/?period=${period}`);
                setStats(response.data);
                setLoading(false);
                setError(null);
                console.log("Fetched stats:", response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
                setLoading(false);
                setError(error.message || "Failed to fetch stats");
                setStats(null);
            }
        }
        fetchStats();
    }, [period]);

    const totalRevenue = stats?.total_revenue || 0;
    const totalOrders = stats?.total_orders || 0;
    const pendingCount = stats?.status_breakdown.find(s => s.status === "pending")?.count || 0;
    const inProgressCount = stats?.status_breakdown.find(s => s.status === "in_progress")?.count || 0;
    const completedCount = stats?.status_breakdown.find(s => s.status === "completed")?.count || 0;

    const getButtonClass = (buttonPeriod) => {
        return period === buttonPeriod
            ? "bg-zinc-800 text-white hover:bg-zinc-700"
            : "bg-white text-black border border-gray-300 hover:bg-gray-100";
    };

    return (
        <div className="min-h-screen overflow-y-auto pb-8">
            {loading ? (
                <p>Loading stats...</p>
            ) : error ? (
                <p>Error loading stats: {error}</p>
            ) : !stats ? (
                <div>No stats available</div>
            ) : (
                <div className="ml-8 mr-8">
                    <div className="flex gap-2 mt-12 ">
                        <Button onClick={() => setPeriod("day")} className={getButtonClass("day")}>
                            Day
                        </Button>
                        <Button onClick={() => setPeriod("week")} className={getButtonClass("week")}>
                            Week
                        </Button>
                        <Button onClick={() => setPeriod("month")} className={getButtonClass("month")}>
                            Month
                        </Button>
                        <Button onClick={() => setPeriod("year")} className={getButtonClass("year")}>
                            Year
                        </Button>
                    </div>
                    <div className="mt-12">
                        <div className="grid grid-cols-3 gap-4">
                            <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} />
                            <StatCard title="Total Orders" value={totalOrders} />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <StatCard title="Pending Orders" value={pendingCount} className="bg-red-600" />
                            <StatCard title="In Progress Orders" value={inProgressCount} className="bg-yellow-500" />
                            <StatCard title="Completed Orders" value={completedCount} className="bg-green-600" />
                        </div>
                    </div>
                    <div>
                        <Card className="mt-6 bg-zinc-800 text-white">
                            <CardHeader>
                                <CardTitle>Revenue Over Time</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={stats.revenue_over_time}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                            <XAxis
                                                dataKey="period"
                                                stroke="#888"
                                                tick={{ fill: '#888' }}
                                            />
                                            <YAxis
                                                stroke="#888"
                                                tick={{ fill: '#888' }}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#333', border: 'none' }}
                                                labelStyle={{ color: '#fff' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="#10b981"
                                                strokeWidth={3}
                                                dot={{ fill: '#10b981', r: 5 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Peak Hours Chart */}
                        <Card className="mt-6 bg-zinc-800 text-white">
                            <CardHeader>
                                <CardTitle>📊 Peak Hours</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={stats.peak_hours}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                            <XAxis
                                                dataKey="hour"
                                                stroke="#888"
                                                tick={{ fill: '#888' }}
                                                tickFormatter={(hour) => `${hour}:00`}
                                            />
                                            <YAxis
                                                stroke="#888"
                                                tick={{ fill: '#888' }}
                                                label={{ value: 'Orders', angle: -90, position: 'insideLeft', fill: '#888' }}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#333', border: 'none' }}
                                                labelStyle={{ color: '#fff' }}
                                                labelFormatter={(hour) => `${hour}:00`}
                                            />
                                            <Bar
                                                dataKey="count"
                                                fill="#3b82f6"
                                                radius={[8, 8, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Top Menu Items & Wines */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <Card className="bg-zinc-800 text-white">
                                <CardHeader>
                                    <CardTitle>🍽️ Top Menu Items</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {stats.top_menu_items.length > 0 ? (
                                        <ul className="space-y-2">
                                            {stats.top_menu_items.map((item, i) => (
                                                <li key={i} className="flex justify-between">
                                                    <span>{item.name} ({item.category})</span>
                                                    <span className="font-bold">{item.total_quantity}x</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-400">No data available</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="bg-zinc-800 text-white">
                                <CardHeader>
                                    <CardTitle>🍷 Top Wines</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {stats.top_wines.length > 0 ? (
                                        <ul className="space-y-2">
                                            {stats.top_wines.map((wine, i) => (
                                                <li key={i} className="flex justify-between">
                                                    <span>{wine.name} ({wine.wine_type})</span>
                                                    <span className="font-bold">{wine.total_quantity}x</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-400">No data available</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Low Stock Alerts */}
                        {(stats.low_stock_ingredients.length > 0 || stats.low_stock_wines.length > 0) && (
                            <Card className="mt-6 bg-red-900 text-white">
                                <CardHeader>
                                    <CardTitle>⚠️ Low Stock Alerts</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {stats.low_stock_ingredients.length > 0 && (
                                        <div className="mb-4">
                                            <h3 className="font-semibold mb-2">Ingredients:</h3>
                                            <ul className="list-disc list-inside">
                                                {stats.low_stock_ingredients.map((item, i) => (
                                                    <li key={i}>{item.name}: {item.stock_quantity} {item.unit}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {stats.low_stock_wines.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold mb-2">Wines:</h3>
                                            <ul className="list-disc list-inside">
                                                {stats.low_stock_wines.map((wine, i) => (
                                                    <li key={i}>{wine.name}: {wine.stock_of_wine} bottles</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CeoDashboard;